package com.ferfonhp.dto.mapper;

import org.springframework.stereotype.Component;

import com.ferfonhp.dto.CourseDTO;
import com.ferfonhp.model.Course;

@Component
public class CourseMapper {
    public CourseDTO toDTO(Course course) {
        if(course == null)
            return null;
        return new CourseDTO(course.getId(), course.getName(), course.getCategory());
    }
    
    public Course toEntity(CourseDTO courseDTO){

        if(courseDTO == null)
            return null;

        Course course = new Course();

        if(courseDTO.id() != null)
            course.setId(courseDTO.id());
        course.setName(courseDTO.name());
        course.setCategory(courseDTO.category());

        return course;
    }
}
