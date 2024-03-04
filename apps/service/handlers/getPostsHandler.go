package handlers

import (
	"database/sql"
	"encoding/json"
	"go-service/models"
	"log"
	"net/http"
)

func GetPostsHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if r.Method != "GET" {
            http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
            return
        }

        rows, err := db.Query("SELECT id, title, content FROM posts")
        if err != nil {
            log.Fatal(err)
        }
        defer rows.Close()

        posts := make([]models.Post, 0)
        for rows.Next() {
            var p models.Post
            if err := rows.Scan(&p.ID, &p.Title, &p.Content); err != nil {
                log.Fatal(err)
            }
            posts = append(posts, p)
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(posts)
    }
}