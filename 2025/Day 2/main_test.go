package main

import (
	"reflect"
	"testing"
)

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

func TestPart1Case1(t *testing.T) {
	expected := []int{11, 22}
	result := GetInvalidIDs(11, 22, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case2(t *testing.T) {
	expected := []int{99}
	result := GetInvalidIDs(95, 115, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case3(t *testing.T) {
	expected := []int{1010}
	result := GetInvalidIDs(998, 1012, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case4(t *testing.T) {
	expected := []int{1188511885}
	result := GetInvalidIDs(1188511880, 1188511890, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case5(t *testing.T) {
	expected := []int{222222}
	result := GetInvalidIDs(222220, 222224, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case6(t *testing.T) {
	expected := []int{}
	result := GetInvalidIDs(1698522, 1698528, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case7(t *testing.T) {
	expected := []int{446446}
	result := GetInvalidIDs(446443, 446449, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case8(t *testing.T) {
	expected := []int{38593859}
	result := GetInvalidIDs(38593856, 38593862, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case9(t *testing.T) {
	expected := []int{}
	result := GetInvalidIDs(565653, 565659, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case10(t *testing.T) {
	expected := []int{}
	result := GetInvalidIDs(824824821, 824824827, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart1Case11(t *testing.T) {
	expected := []int{}
	result := GetInvalidIDs(2121212118, 2121212124, Part1)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case1(t *testing.T) {
	expected := []int{11, 22}
	result := GetInvalidIDs(11, 22, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case2(t *testing.T) {
	expected := []int{99, 111}
	result := GetInvalidIDs(95, 115, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case3(t *testing.T) {
	expected := []int{999, 1010}
	result := GetInvalidIDs(998, 1012, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case4(t *testing.T) {
	expected := []int{1188511885}
	result := GetInvalidIDs(1188511880, 1188511890, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case5(t *testing.T) {
	expected := []int{222222}
	result := GetInvalidIDs(222220, 222224, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case6(t *testing.T) {
	expected := []int{}
	result := GetInvalidIDs(1698522, 1698528, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case7(t *testing.T) {
	expected := []int{446446}
	result := GetInvalidIDs(446443, 446449, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case8(t *testing.T) {
	expected := []int{38593859}
	result := GetInvalidIDs(38593856, 38593862, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case9(t *testing.T) {
	expected := []int{565656}
	result := GetInvalidIDs(565653, 565659, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case10(t *testing.T) {
	expected := []int{824824824}
	result := GetInvalidIDs(824824821, 824824827, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestPart2Case11(t *testing.T) {
	expected := []int{2121212121}
	result := GetInvalidIDs(2121212118, 2121212124, Part2)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected: %v | Received: %v", expected, result)
	}
}

func TestSolution1(t *testing.T) {
	expected := 1227775554
	result := SolvePart1(testInput)
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}

func TestSolution2(t *testing.T) {
	expected := 4174379265
	result := SolvePart2(testInput)
	if result != expected {
		t.Errorf("Expected: %d | Received: %d", expected, result)
	}
}
