package main

import "testing"

var testInput = []string{
	"11-22",
	"95-115",
	"998-1012",
	"1188511880-1188511890",
	"222220-222224",
	"1698522-1698528",
	"446443-446449",
	"38593856-38593862",
	"565653-565659",
	"824824821-824824827",
	"2121212118-2121212124",
}

func TestIsInvalid(t *testing.T) {
	if !isInvalid(11) {
		t.Errorf("For 11 - Expected: true | Received: false")
	}

	if !isInvalid(123123) {
		t.Errorf("For 123123 - Expected: true | Received: false")
	}

	if isInvalid(1) {
		t.Errorf("For 1 - Expected: false | Received: true ")
	}

	if isInvalid(112233) {
		t.Errorf("For 112233 - Expected: false | Received: true ")
	}
}

func TestSolution1(t *testing.T) {
	expected := 1227775554
	result := SolvePart1(testInput)
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}
