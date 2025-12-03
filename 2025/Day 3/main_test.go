package main

import (
	"testing"
)

var testInput = []string{
	"987654321111111",
	"811111111111119",
	"234234234234278",
	"818181911112111",
}

func TestPart1Cases(t *testing.T) {
	for i := range testInput {
		expected := 0
		result := GetMaxJoltage(testInput[i], 2)
		switch i {
		case 0:
			expected = 98
		case 1:
			expected = 89
		case 2:
			expected = 78
		case 3:
			expected = 92
		}
		if result != expected {
			t.Errorf("Expected: %v | Received: %v", expected, result)
		}
	}
}

func TestPart2Cases(t *testing.T) {
	for i := range testInput {
		expected := 0
		result := GetMaxJoltage(testInput[i], 12)
		switch i {
		case 0:
			expected = 987654321111
		case 1:
			expected = 811111111119
		case 2:
			expected = 434234234278
		case 3:
			expected = 888911112111
		}
		if result != expected {
			t.Errorf("Expected: %v | Received: %v", expected, result)
		}
	}
}

func SolvePart1Example(t *testing.T) {
	expected := 357
	result := 0
	for i := range testInput {
		result += GetMaxJoltage(testInput[i], 2)
	}
	if result != expected {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func SolvePart2Example(t *testing.T) {
	expected := 3121910778619
	result := 0
	for i := range testInput {
		result += GetMaxJoltage(testInput[i], 12)
	}
	if result != expected {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}
