package com.ferfonhp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.ferfonhp.dto.CourseDTO;
import com.ferfonhp.dto.mapper.CourseMapper;
import com.ferfonhp.exception.RecordNotFoundException;
import com.ferfonhp.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
            this.courseRepository = courseRepository;
            this.courseMapper = courseMapper;
    }

    public List<CourseDTO> list() {
        /* Forma mais básica */
        // List<Course> courses = courseRepository.findAll();
        // List<CourseDTO> dtos = new ArrayList<>(courses.size());
        // for(Course course : courses){
        //     CourseDTO dto = new CourseDTO(course.getId(), course.getName(), course.getCategory());
        //     dtos.add(dto);
        // }
        // return courseRepository.findAll();
        
        // Faz o mapeamento Course para CourseDTO
        return courseRepository.findAll()
            .stream()
            .map(course -> courseMapper.toDTO(course))
            .collect(Collectors.toList());
    }

    public CourseDTO findById(@PathVariable @NotNull @Positive Long id) {
        return courseRepository.findById(id)
            .map(course -> courseMapper.toDTO(course))
            .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO course) {
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(course)));
    }

    public CourseDTO update(
        @NotNull @Positive Long id,
        @Valid @NotNull CourseDTO course
        ) {
        return courseRepository.findById(id)
            .map(recordFound -> {
                recordFound.setName(course.name());
                recordFound.setCategory(course.category());

                return courseMapper.toDTO(courseRepository.save(recordFound));
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {

        courseRepository.delete(
            courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id))
            );

        // courseRepository.findById(id)
        //     .map(recordFound -> {
        //         courseRepository.deleteById(id);

        //         return true;
        //     })
        //     .orElseThrow(() -> new RecordNotFoundException(id));
    }
}
