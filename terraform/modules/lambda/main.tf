data "archive_file" "webhook" {
  type        = "zip"
  source_dir  = "${path.root}/../lambda/shopify-webhook"
  output_path = "${path.module}/webhook.zip"
}

resource "aws_iam_role" "lambda" {
  name = "${var.project_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda.name
}

resource "aws_lambda_function" "webhook" {
  filename         = data.archive_file.webhook.output_path
  function_name    = "${var.project_name}-shopify-webhook"
  role             = aws_iam_role.lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  source_code_hash = data.archive_file.webhook.output_base64sha256

  environment {
    variables = {
      GITHUB_TOKEN = var.github_token
      GITHUB_OWNER = var.github_owner
      GITHUB_REPO  = var.github_repo
    }
  }
}

resource "aws_lambda_function_url" "webhook" {
  function_name      = aws_lambda_function.webhook.function_name
  authorization_type = "NONE"
}
