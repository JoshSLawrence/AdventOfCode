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

func RemoveRolls(input []string) (int, []string) {
	solution := 0
	offsets := [8][2]int{
		{-1, -1}, {-1, 0}, {-1, 1},
		{0, -1}, {0, 1}, // No Center
		{1, -1}, {1, 0}, {1, 1},
	}
	updatedInput := make([]string, len(input))
	copy(updatedInput, input)
	for i := range input {
		row := []byte(updatedInput[i])
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
				row[j] = '.'
			}
		}
		updatedInput[i] = string(row)
	}
	return solution, updatedInput
}

func RemoveMaxRolls(input []string) int {
	solution := 0
	for {
		rollsRemoved, updatedInput := RemoveRolls(input)
		input = updatedInput
		solution += rollsRemoved
		if rollsRemoved == 0 {
			break
		}
	}
	return solution
}

func main() {
	input := GetInput("input.txt")
	solution1, _ := RemoveRolls(input)
	solution2 := RemoveMaxRolls(input)
	fmt.Println(solution1)
	fmt.Println(solution2)
}
