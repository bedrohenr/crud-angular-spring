package com.ferfonhp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferfonhp.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
}
