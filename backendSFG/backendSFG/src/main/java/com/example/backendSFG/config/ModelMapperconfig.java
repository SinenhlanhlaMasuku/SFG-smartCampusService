package com.example.backendSFG.config;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration.AccessLevel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

  @Configuration
    public class ModelMapperconfig  {
   
        @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        
        // Configure to use private fields and match fields strictly
        modelMapper.getConfiguration()
            .setFieldMatchingEnabled(true)
            .setFieldAccessLevel(AccessLevel.PRIVATE)
            .setMethodAccessLevel(AccessLevel.PUBLIC)
            .setAmbiguityIgnored(true);  // This helps ignore multiple matches
        
        
        
        return modelMapper;
    
    }
        private ModelMapper overrideDefaultMappingConfig() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
 
        return modelMapper;
    }
 
    public <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        ModelMapper modelMapper = overrideDefaultMappingConfig();
 
        return source
                .stream()
                .map(element -> modelMapper.map(element, targetClass))
                .collect(Collectors.toList());
    }
 
    }

