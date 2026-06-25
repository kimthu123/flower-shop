variable "project_name" {
  description = "Project name"
  type        = string
  default     = "flower-shop"
}

variable "bucket_name" {
  description = "S3 bucket name for frontend"
  type        = string
  default     = "flower-shop-frontend-tram58"
}

variable "domain_name" {
  description = "Custom domain name"
  type        = string
  default     = "thecollectivehouse.com.au"
}
