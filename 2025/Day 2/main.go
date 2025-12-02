package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

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

	return strings.Split(input[0], ",")
}

func isInvalid(n int) bool {
	s := strconv.Itoa(n)
	if len(s)%2 != 0 {
		return false
	}
	mid := len(s) / 2
	return s[:mid] == s[mid:]
}

func checkIdSequence(start int, end int) int {
	sum := 0
	for i := start; i <= end; i++ {
		if isInvalid(i) {
			sum += i
		}
	}
	return sum
}

func SolvePart1(testInput []string) int {
	sum := 0
	for i := range testInput {
		parts := strings.Split(testInput[i], "-")
		start, _ := strconv.Atoi(parts[0])
		end, _ := strconv.Atoi(parts[1])
		sum += checkIdSequence(start, end)
	}
	return sum
}

func main() {
	input := getInput("input.txt")
	solution1 := SolvePart1(input)

	fmt.Println(solution1)
}
