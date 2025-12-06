package main

import (
	"testing"
)

var testRanges = [][]int{
	{3, 5},
	{10, 14},
	{16, 20},
	{12, 18},
}

var testIngredients = []int{
	1, 5, 8, 11, 17, 32,
}

func TestPart1Cases(t *testing.T) {
	expected := 3
	result := GetTotalFreshIngredients(testRanges, testIngredients)
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}

func TestPart2Cases(t *testing.T) {
	expected := 14
	result := GetTotalFreshIds(testRanges)
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}
