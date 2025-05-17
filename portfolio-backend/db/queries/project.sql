-- name: CreateProject :one
INSERT INTO projects (title, description, start_date, end_date, image_url, stack, link_github, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;

-- name: ListProjectsByUser :many
SELECT * FROM projects WHERE user_id = $1;
