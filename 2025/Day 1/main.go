package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func getInput(filename string) []string {
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

func rotate(position int, line string) int {
	direction := line[:1]
	steps, _ := strconv.Atoi(line[1:])

	switch direction {
	case "R":
		position += steps
	case "L":
		position -= steps
	}

	return position
}

func solvePart1(input []string) int {
	position := 50
	totalZeros := 0

	for _, line := range input {
		position = rotate(position, line)
		position = position % 100

		if position < 0 {
			position += 100
		}

		if position == 0 {
			totalZeros += 1
		}
	}

	return totalZeros
}

func solvePart2(input []string) int {
	position := 50
	totalZeros := 0

	for _, line := range input {
		direction := line[:1]
		steps, _ := strconv.Atoi(line[1:])

		for i := 1; i <= steps; i++ {
			if direction == "R" {
				position = (position + 1) % 100
			} else {
				position = (position - 1 + 100) % 100
			}
			if position == 0 {
				totalZeros++
			}
		}
	}

	return totalZeros
}

func main() {
	input := getInput("input.txt")

	solution1 := solvePart1(input)
	solution2 := solvePart2(input)

	fmt.Println(solution1)
	fmt.Println(solution2)
}
