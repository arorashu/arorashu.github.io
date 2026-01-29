### Sorting int slices
    
    
        package main
    
        import (
            "fmt"
            "sort"
        )
    
        func main() {
            arr := []int {20, 13, 12, 5, 1}
                sort.Ints(arr)
            fmt.Printf("%v \n", arr)
        }
        

code at [go playground](https://play.golang.org/p/twbbzi7qi_y)

[godoc reference](https://golang.org/pkg/sort/)
