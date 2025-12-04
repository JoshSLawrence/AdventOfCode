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
	result := SolvePart1(testInput)
	if result != expected {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}
