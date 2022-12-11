package com.example.videogamecatalog.repository;

import com.example.videogamecatalog.models.VideoGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoGameRepo extends JpaRepository<VideoGame, Long> {
}
