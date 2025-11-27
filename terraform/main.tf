provider "aws" {
  region = "us-east-1" # O la región que uses (us-east-1 es la estándar)
}

# 1. EL BUCKET S3 (Donde se guardan tus archivos .html, .js, .css)
resource "aws_s3_bucket" "frontend_bucket" {
  # ¡CAMBIA ESTO POR UN NOMBRE ÚNICO! Ejemplo: parcial-juanperez-2025
  bucket = "parcial-modulo-5-pedrokorone-2025" 
}

# 2. CONFIGURACIÓN PARA QUE S3 ACTÚE COMO WEBSITE
# Esto es vital para React Router. Si entras a /short/123, S3 te manda al index.html
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.frontend_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# 3. DESBLOQUEAR EL ACCESO PÚBLICO (Para que CloudFront o la gente pueda leerlo)
resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.frontend_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 4. POLÍTICA DE LECTURA (Permite que cualquiera vea tu página)
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.frontend_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend_bucket.arn}/*"
      },
    ]
  })
  
  # Esperamos a que se quite el bloqueo público antes de aplicar la política
  depends_on = [aws_s3_bucket_public_access_block.public_access]
}

# 5. CLOUDFRONT (La red de entrega de contenido - Requerido por el enunciado)
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.website_config.website_endpoint
    origin_id   = "S3Origin"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# 6. SALIDAS (Te mostrará la URL al terminar)
output "website_url" {
  description = "URL del Bucket S3 (Acceso directo)"
  value       = aws_s3_bucket_website_configuration.website_config.website_endpoint
}

output "cloudfront_url" {
  description = "URL de CloudFront (La que usarás en el parcial)"
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}