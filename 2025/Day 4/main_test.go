package main

import (
	"testing"
)

var testInput = []string{
	"..@@.@@@@.",
	"@@@.@.@.@@",
	"@@@@@.@.@@",
	"@.@@@@..@.",
	"@@.@@@@.@@",
	".@@@@@@@.@",
	".@.@.@.@@@",
	"@.@@@.@@@@",
	".@@@@@@@@.",
	"@.@.@@@.@.",
}

func TestPart1Cases(t *testing.T) {
	expected := 13
	result, _ := RemoveRolls(testInput)
	if result != expected {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Cases(t *testing.T) {
	expected := 43
	result := RemoveMaxRolls(testInput)
	if result != expected {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}
