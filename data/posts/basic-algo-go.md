# Basic algorithms in Go

## Graph

### Topological sort
    
    
                // edges from prereq[][1] -> prereq[][0]
                // function to return if topologicalSort is possible
                // finalQ stores the resulting sort
                func findOrder(numCourses int, prerequisites [][]int) []int {
    
                    finalQ := make([]int, 0)
                    g := make(map[int][]int)
                    
                    for _, pair := range prerequisites {
                        if _, ok := g[pair[1]]; !ok {
                            g[pair[1]] = make([]int, 0)
                        }     
                        g[pair[1]] = append(g[pair[1]], pair[0])
                    }
                    
                    visited := make([]int, numCourses)
                    
                    // 0 is unvisited
                    // 1 is temp
                    // 2 is permanent
                    
                    for i:=0; i < numCourses; i++ {
                        if visited[i] != 2{
                            if !dfs(i, g, visited, &finalQ;) {
                                finalQ = finalQ[0:0]
                                return finalQ
                            }
                        }
                    }
                    if len(finalQ) == 0 {
                        for i:=0; i < numCourses; i++ {
                            finalQ = append(finalQ, i)
                        }
                    }
                    reverse(finalQ)
                    return finalQ
                    
                }
                
                func dfs(start int, g map[int][]int, visited []int, finalQ *[]int) bool {
                    if visited[start]==1 { // temp
                        return false
                    }
                    if visited[start] == 2 { // why? 
                        return true
                    }
                    visited[start] = 1
                    for _, elem := range g[start] {
                        if !dfs(elem, g, visited, finalQ) {
                            return false
                        }
                    }
                    visited[start] = 2
                    *finalQ = append(*finalQ, start)
                    return true
                }
                
                func reverse(arr []int) {
                    sz := len(arr)
                    for i:=0; i
    
    
            References: [Wikipedia](https://en.wikipedia.org/wiki/Topological_sorting)
        
    
    
        
    
    
            
    
    ## Strings
    
    
            
    
    ### Trie
    
    
            
    
    
     
                // Refernece:  https://github.com/EndlessCheng/codeforces-go
                func init() { debug.SetGCPercent(-1) }
    
                type Trie struct {
                    children [26]*Trie
                    endOfWord bool
                }
    
    
                /** Initialize your data structure here. */
                func Constructor() Trie {
                    return Trie {}
                }
    
    
                /** Inserts a word into the trie. */
                func (this *Trie) Insert(word string)  {
                    current := this
                    for _, ch := range word {
                        index := ch - 'a'
                        if current.children[index] == nil {
                            current.children[index] = &Trie; {}
                        }
                        current = current.children[index]
                    }
                    current.endOfWord = true
                }
    
    
                /** Returns if the word is in the trie. */
                func (this *Trie) Search(word string) bool {
                    current := this
                    for _, ch := range word {
                        index := ch - 'a'
                        if current.children[index] == nil {
                            return false
                        }
                        current = current.children[index]
                    }
                    return current.endOfWord
                }
    
    
                /** Returns if there is any word in the trie that starts with the given prefix. */
                func (this *Trie) StartsWith(prefix string) bool {
                    current := this
                    for _, ch := range prefix {
                        index := ch - 'a'
                        if current.children[index] == nil {
                            return false
                        }
                        current = current.children[index]
                    }
                    return true
                }
            

References: [EndlessCheng](https://github.com/EndlessCheng/codeforces-go)
