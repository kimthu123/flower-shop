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
