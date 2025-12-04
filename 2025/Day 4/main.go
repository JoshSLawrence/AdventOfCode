package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func GetInput(filename string) []string {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatalf("Failed to open file: %v", err)
	}
	defer file.Close()
	var input []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		input = append(input, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	return input
}

func SolvePart1(input []string) int {
	solution := 0
	offsets := [8][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1}, // No Center
		{1, -1}, {1, 0}, {1, 1},
	}
	for i := range input {
		for j := 0; j < len(input[i]); j++ {
			if input[i][j] != '@' {
				continue
			}
			count := 0
			for _, offset := range offsets {
				ni, nj := i+offset[0], j+offset[1]
				if ni < 0 || ni >= len(input) {
					continue
				}
				if nj < 0 || nj >= len(input[ni]) {
					continue
				}
				if input[ni][nj] == '@' {
					count++
				}
			}
			if count < 4 {
				solution += 1
			}
		}
	}
	return solution
}

func main() {
	input := GetInput("input.txt")
	solution1 := SolvePart1(input)
	fmt.Println(solution1)
}
