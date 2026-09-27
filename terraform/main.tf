terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }

  backend "gcs" {
    bucket = "portfolio-project-tf-infra"
    prefix = "homepage"
  }
}

provider "google" {
  project = "portfolio-project-500120"
  region  = "me-central1"
}

resource "google_artifact_registry_repository" "builds_repo" {
  repository_id          = "builds-repo"
  format                 = "DOCKER"
  cleanup_policy_dry_run = true

  docker_config {
    immutable_tags = false
  }
}

resource "google_service_account" "cloud_run" {
  account_id   = "ng-ssr-cloud-run-sa"
  display_name = "angular ssr cloud run sa"
}

resource "google_secret_manager_secret" "discord_url" {
  secret_id = "DISCORD_URL"

  replication {
    auto {}
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "google_secret_manager_secret_iam_member" "cloud_run_reads_discord_url" {
  secret_id = google_secret_manager_secret.discord_url.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_cloud_run_v2_service" "prod" {
  name     = "nghomepage-ng-ssr"
  location = "me-central1"

  # Service-wide minimum instances; the scaling block inside template is per revision.
  scaling {
    min_instance_count = 0
  }

  template {
    service_account = google_service_account.cloud_run.email

    scaling {
      max_instance_count = 20
    }

    containers {
      name  = "nghomepage-ng-ssr-1"
      image = "me-central1-docker.pkg.dev/portfolio-project-500120/builds-repo/angular-homepage-ssr/nghomepage-ng-ssr:latest"

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }

      env {
        name = "DISCORD_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.discord_url.secret_id
            version = "latest"
          }
        }
      }
    }
  }

  lifecycle {
    # Cloud Build deploys new images, so Terraform must not change the image (or the "deployed by" fields) back.
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version,
    ]
  }
}

resource "google_cloud_run_v2_service_iam_member" "prod_public" {
  name     = google_cloud_run_v2_service.prod.name
  location = google_cloud_run_v2_service.prod.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_v2_service" "preview" {
  name     = "nghomepage-ng-ssr-preview"
  location = "me-central1"

  scaling {
    min_instance_count = 0
  }

  template {
    service_account = google_service_account.cloud_run.email

    scaling {
      max_instance_count = 20
    }

    containers {
      name  = "nghomepage-ng-ssr-preview-1"
      image = "me-central1-docker.pkg.dev/portfolio-project-500120/builds-repo/angular-homepage-ssr/nghomepage-ng-ssr-preview:latest"

      resources {
        limits = {
          cpu    = "1000m"
          memory = "512Mi"
        }
        cpu_idle          = true
        startup_cpu_boost = true
      }

      env {
        name = "DISCORD_URL"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.discord_url.secret_id
            version = "latest"
          }
        }
      }
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].containers[0].image,
      client,
      client_version,
    ]
  }
}

resource "google_cloud_run_v2_service_iam_member" "preview_public" {
  name     = google_cloud_run_v2_service.preview.name
  location = google_cloud_run_v2_service.preview.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# These resources already exist in GCP, so the first apply records them in state instead of trying to create them.

import {
  to = google_artifact_registry_repository.builds_repo
  id = "projects/portfolio-project-500120/locations/me-central1/repositories/builds-repo"
}

import {
  to = google_service_account.cloud_run
  id = "projects/portfolio-project-500120/serviceAccounts/ng-ssr-cloud-run-sa@portfolio-project-500120.iam.gserviceaccount.com"
}

import {
  to = google_secret_manager_secret.discord_url
  id = "projects/portfolio-project-500120/secrets/DISCORD_URL"
}

import {
  to = google_cloud_run_v2_service.prod
  id = "projects/portfolio-project-500120/locations/me-central1/services/nghomepage-ng-ssr"
}

import {
  to = google_cloud_run_v2_service.preview
  id = "projects/portfolio-project-500120/locations/me-central1/services/nghomepage-ng-ssr-preview"
}
