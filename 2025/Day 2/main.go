package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Constraint int

const (
	Part1 Constraint = iota
	Part2
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

func GetInvalidIDs(start int, end int, constraint Constraint) []int {
	invalidIds := []int{}
	for i := start; i <= end; i++ {
		s := strconv.Itoa(i)
		n := len(s)
		switch constraint {
		case Part1:
			if len(s)%2 != 0 {
				continue
			}
			mid := len(s) / 2
			if s[:mid] == s[mid:] {
				invalidIds = append(invalidIds, i)
			}
		case Part2:
			for l := 1; l <= n/2; l++ {
				if n%l != 0 {
					continue
				}
				part := s[:l]
				repeated := strings.Repeat(part, n/l)
				if repeated == s && n/l >= 2 {
					invalidIds = append(invalidIds, i)
					break
				}
			}
		}
	}
	return invalidIds
}

func SolvePart1(testInput []string) int {
	var invalidIds []int
	for i := range testInput {
		parts := strings.Split(testInput[i], "-")
		start, _ := strconv.Atoi(parts[0])
		end, _ := strconv.Atoi(parts[1])
		invalidIds = append(invalidIds, GetInvalidIDs(start, end, Part1)...)
	}
	sum := 0
	for _, v := range invalidIds {
		sum += v
	}
	return sum
}

func SolvePart2(testInput []string) int {
	var invalidIds []int
	for i := range testInput {
		parts := strings.Split(testInput[i], "-")
		start, _ := strconv.Atoi(parts[0])
		end, _ := strconv.Atoi(parts[1])
		invalidIds = append(invalidIds, GetInvalidIDs(start, end, Part2)...)
	}
	sum := 0
	for _, v := range invalidIds {
		sum += v
	}
	return sum
}

func main() {
	input := getInput("input.txt")
	solution1 := SolvePart1(input)
	solution2 := SolvePart2(input)
	fmt.Println(solution1)
	fmt.Println(solution2)
}
