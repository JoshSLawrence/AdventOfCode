package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
)

func GetInput(filename string) ([][]int, []int) {
	var ranges [][]int
	var ingredients []int
	flag := false
	file, err := os.Open(filename)
	if err != nil {
		log.Fatalf("Failed to open file: %v", err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if scanner.Text() == "" {
			flag = true
			continue
		}
		if !flag {
			s := strings.Split(scanner.Text(), "-")
			lo, _ := strconv.Atoi(s[0])
			hi, _ := strconv.Atoi(s[1])
			ranges = append(ranges, []int{lo, hi})
		} else {
			n, _ := strconv.Atoi(scanner.Text())
			ingredients = append(ingredients, n)
		}
	}
	return ranges, ingredients
}

func GetTotalFreshIngredients(ranges [][]int, ingredients []int) int {
	totalFreshIngredients := 0
	for _, j := range ingredients {
		isFresh := false
		for _, i := range ranges {
			if j >= i[0] && j <= i[1] {
				isFresh = true
			}
		}
		if isFresh {
			totalFreshIngredients++
		}
	}
	return totalFreshIngredients
}

func GetTotalFreshIds(ranges [][]int) int {
	var mergedRanges [][]int
	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i][0] < ranges[j][0]
	})
	for i, r := range ranges {
		if i == 0 {
			mergedRanges = append(mergedRanges, r)
			continue
		}
		low, hi := r[0], r[1]
		_, prevHi := mergedRanges[len(mergedRanges)-1][0], mergedRanges[len(mergedRanges)-1][1]
		if low <= prevHi {
			if prevHi >= hi {
				continue
			} else {
				mergedRanges[len(mergedRanges)-1][1] = hi
			}
		} else {
			mergedRanges = append(mergedRanges, r)
		}
	}
	sum := 0
	for _, i := range mergedRanges {
		difference := i[1] - i[0] + 1
		sum += difference
	}
	return sum
}

func main() {
	ranges, ingredients := GetInput("input.txt")
	solution1 := GetTotalFreshIngredients(ranges, ingredients)
	solution2 := GetTotalFreshIds(ranges)
	fmt.Println(solution1)
	fmt.Println(solution2)
}
