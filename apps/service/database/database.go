package database

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func ConnectToDB() *sql.DB {
    connStr := "user=yourusername dbname=yourdbname sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }
    return db
}