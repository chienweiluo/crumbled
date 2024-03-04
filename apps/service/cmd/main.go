package main

import (
	"go-service/database"
	"go-service/handlers"
	"log"
	"net/http"
)

func main() {
		db := database.ConnectToDB()
    defer db.Close()

    http.HandleFunc("/posts", handlers.GetPostsHandler(db))
    http.HandleFunc("/post", handlers.CreatePostHandler(db))

    log.Println("Server is running on http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}

