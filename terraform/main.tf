terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "flower-shop-terraform-state"
    key     = "prod/terraform.tfstate"
    region  = "ap-southeast-2"
    profile = "terraform-deployer"
  }
}

provider "aws" {
  region  = "ap-southeast-2"
  profile = "terraform-deployer"
}

provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
  profile = "terraform-deployer"
}

module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
}

module "route53" {
  source                 = "./modules/route53"
  domain_name            = var.domain_name
  cloudfront_domain_name = module.cloudfront.distribution_domain_name
}

module "acm" {
  source      = "./modules/acm"
  providers   = { aws = aws.us_east_1 }
  domain_name = var.domain_name
  zone_id     = module.route53.zone_id
}

module "cloudfront" {
  source                      = "./modules/cloudfront"
  project_name                = var.project_name
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  bucket_id                   = module.s3.bucket_id
  bucket_arn                  = module.s3.bucket_arn
  domain_name                 = var.domain_name
  certificate_arn             = module.acm.certificate_arn
}

module "lambda" {
  source        = "./modules/lambda"
  project_name  = var.project_name
  github_token  = var.github_token
  github_owner  = var.github_owner
  github_repo   = var.github_repo
}
