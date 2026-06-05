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

module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
}

module "cloudfront" {
  source                      = "./modules/cloudfront"
  project_name                = var.project_name
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  bucket_id                   = module.s3.bucket_id
  bucket_arn                  = module.s3.bucket_arn
}
