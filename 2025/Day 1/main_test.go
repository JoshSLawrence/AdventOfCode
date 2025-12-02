package main

import "testing"

var testInput = []string{
	"L68",
	"L30",
	"R48",
	"L5",
	"R60",
	"L55",
	"L1",
	"L99",
	"R14",
	"L82",
}

func TestSolution1(t *testing.T) {
	result := solvePart1(testInput)
	expected := 3
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}

func TestSolution2(t *testing.T) {
	result := solvePart2(testInput)
	expected := 6
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}
