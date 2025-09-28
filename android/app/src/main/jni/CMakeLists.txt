# Minimum CMakeLists.txt for patched OnLoad.cpp
cmake_minimum_required(VERSION 3.13.0)

add_library(appmodules SHARED OnLoad.cpp)

target_include_directories(appmodules PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
)

target_link_libraries(appmodules
    # Add required libraries here if needed
)
