package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
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

func GetMaxJoltage(input string, joltageLength int) int {
	maxJoltage := ""
	index := -1
	for len(maxJoltage) < joltageLength {
		maxV := -1
		for i := (index + 1); i <= len(input)-(joltageLength-len(maxJoltage)); i++ {
			v, _ := strconv.Atoi(string(input[i]))
			if v > maxV {
				maxV = v
				index = i
			}
		}
		s := strconv.Itoa(maxV)
		maxJoltage += s
	}
	s, _ := strconv.Atoi(maxJoltage)
	return s
}

func main() {
	solution1 := 0
	solution2 := 0
	input := GetInput("input.txt")
	for i := range input {
		solution1 += GetMaxJoltage(input[i], 2)
		solution2 += GetMaxJoltage(input[i], 12)
	}
	fmt.Println(solution1)
	fmt.Println(solution2)
}
