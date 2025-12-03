package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

type Position int

const (
	Left Position = iota
	Right
)

type Joltage struct {
	index    int
	value    int
	position Position
}

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

func GetMaxJoltage(input string) int {
	max1 := Joltage{
		index:    -1,
		value:    -1,
		position: Left,
	}
	max2 := Joltage{
		index:    -1,
		value:    -1,
		position: Left,
	}
	for i, ch := range input {
		n, _ := strconv.Atoi(string(ch))
		if n > max1.value {
			max1.index = i
			max1.value = n
		}
	}

	var slice string
	if max1.index == len(input)-1 {
		slice = input[:max1.index]
		max1.position = Right
		max2.position = Left
	} else {
		slice = input[(max1.index + 1):]
		max1.position = Left
		max2.position = Right
	}

	for i, ch := range slice {
		n, _ := strconv.Atoi(string(ch))
		if n > max2.value {
			max2.index = i
			max2.value = n
		}
	}

	var temp string

	if max1.position == Left {
		temp = fmt.Sprintf("%d%d", max1.value, max2.value)
	} else {
		temp = fmt.Sprintf("%d%d", max2.value, max1.value)
	}
	maxJotlage, _ := strconv.Atoi(temp)

	return maxJotlage
}

func main() {
	solution1 := 0
	input := GetInput("input.txt")
	for i := range input {
		solution1 += GetMaxJoltage(input[i])
	}
	fmt.Println(solution1)
}
