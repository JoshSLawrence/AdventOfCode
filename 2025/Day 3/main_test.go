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
		result := GetMaxJoltage(testInput[i])
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
