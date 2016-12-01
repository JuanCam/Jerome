module.exports = function(grunt) {
    'use strict'
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true
                }
            }
        },
        jasmine:{
        	pivotal:{
        		src:'src/**/*.js',
        		options:{
        			specs:'specs/*Spec.js'
        		}
        	}
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('server', ['connect:server']);
}
