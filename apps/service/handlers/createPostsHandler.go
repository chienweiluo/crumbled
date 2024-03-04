package handlers

import (
	"database/sql"
	"encoding/json"
	"go-service/models"
	"log"
	"net/http"
)

func CreatePostHandler(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != "POST" {
			http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
			return
		}

		var p models.Post
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "Bad request", http.StatusBadRequest)
			return
		}

		_, err := db.Exec("INSERT INTO posts (title, content) VALUES ($1, $2)", p.Title, p.Content)
		if err != nil {
			log.Fatal(err)
		}

		w.WriteHeader(http.StatusCreated)
	}
}