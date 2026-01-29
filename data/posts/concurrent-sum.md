⛸️

# Simple Concurrency

# What is concurrency?

[Concurrency](https://en.wikipedia.org/wiki/Concurrency_\(computer_science\)) is the ability of different parts or units of a program, algorithm, or problem to be executed out-of-order or in partial order, without affecting the final outcome. 

You may also think of them as threads of computation, and different threads can be run independent of one another, asynchronously, or in parallel, depending on what your hardware supports.

Concurrency can significantly improve the overall speed of execution in multi-core systems. 

In this article, I will explore some basic building blocks of doing simple concurrent computation in C++. All code examples can be found [here](https://github.com/arorashu/learn-cxx/tree/master/concurrent).

# Sum of numbers

One of the simplest problems to showcase the benifits of concurrency is a sum of numbers. Let's write a function in C++ to sum the numbers from 1 to 10,000,000 (10 million).
    
    
    /**
     * Program do sum of numbers
    **/
    
    #include <iostream>
    #include <chrono>
    
    constexpr auto maxValue = 10000000;
    
    int64_t doSum(int64_t start, int64_t end) {
      int64_t sum = 0;
      for(auto i=start; i<=end; i++) {
        sum += i;
      }
      return sum;
    }
    
    using namespace std;
    
    int main(int argc, char **argv)
    {
      int64_t linearSum = 0;
      auto begin_time = chrono::steady_clock::now();
      linearSum = doSum(1, maxValue);
      auto end_time =chrono::steady_clock::now();
      
      double elapsed_ms = 
      chrono::duration_cast<chrono::milliseconds>(end_time - begin_time).count();
    
      cout << "len, sum, time(milli seconds)\n";
      cout << maxValue << ", " << linearSum << ", " << elapsed_ms << endl;
    
      return 0;
    }

This consistently runs in a median time of 25ms on my machine. Let's try to speed this up using by adding some concurrency. I am using the g++ compiler without any optimizations. Compile by running: `$ g++ basic-sum.cpp`

# Using threads and atomic

Using C++ [`std::thread`](https://en.cppreference.com/w/cpp/thread/thread) and [`std::atomic`](https://en.cppreference.com/w/cpp/atomic/atomic), the following code divides the sum computation evenly among 10 threads. 
    
    
    /**
     * sum of numbers using threads and atomic
    **/
    
    #include <iostream>
    #include <chrono>
    #include <thread>
    #include <atomic>
    #include <vector>
    
    using namespace std;
    
    constexpr auto maxValue = 10000000;
    
    atomic<int64_t> concurrentSum{0};
    
    void doSum(int64_t start, int64_t end) {
      int64_t sum = 0;
      for(auto i=start; i<=end; i++) {
        sum += i;
      }
    
      concurrentSum += sum;
    }
    
    
    int main(int argc, char **argv)
    {
      constexpr int THREADS_COUNT = 10;
      cout << "len, sum, time(milli seconds)\n";
      vector<thread> threadPool(10);
      auto begin_time = chrono::steady_clock::now();
      for(int i=0; i<THREADS_COUNT; i++) {
        threadPool[i] = thread(&doSum, (i*maxValue/THREADS_COUNT)+1, ((i+1)*maxValue/THREADS_COUNT));
      }
    
      for(auto &th: threadPool) {
        th.join();
      }
    
      auto end_time =chrono::steady_clock::now();
      
      double elapsed_ms = 
      chrono::duration_cast<chrono::milliseconds>(end_time - begin_time).count();
    
      cout << maxValue << ", " << concurrentSum << ", " << elapsed_ms << endl;
    
      return 0;
    }

Compiling again with g++, this runs in a median time of 5ms on my machine. Roughly 5 times speedup! Though the code is more complex. 

Compile using: `$ g++ thread-sum-atomic.cpp -pthread`

Though this isn't a great benchmarking technique, we can list out all the outputs from a 1000 runs to get a ballpark figure: `$ for i in {1..1000}; do ./a.out; done | sort | uniq -c`

# Using threads and mutex

Using a [`std::mutex`](https://en.cppreference.com/w/cpp/thread/mutex) instead of `std::atomic`, we only have to change the soSum function to guard the update of the `concurrentSum`. The only changes are:
    
    
    #include <mutex>
    
    int64_t concurrentSum{0};
    mutex sum_mutex;
    
    void doSum(int64_t start, int64_t end) {
      int64_t sum = 0;
      for(auto i=start; i<=end; i++) {
        sum += i;
      }
      sum_mutex.lock();
      concurrentSum += sum;
      sum_mutex.unlock();
    }

The complete code can be found [here](https://github.com/arorashu/learn-cxx/blob/master/concurrent/thread-sum-mutex.cpp). This also runs in a median time of 5ms on my machine.

# Using tasks

Tasks is an even higher level of abstraction that avoids dealing with threads directly. Using tasks ([`std::async`](https://en.cppreference.com/w/cpp/thread/async)), we can write the code to do sum as:
    
    
    /**
     * sum of numbers using tasks
    **/
    
    #include <iostream>
    #include <chrono>
    #include <future>
    #include <vector>
    #include <atomic>
    
    using namespace std;
    
    constexpr auto maxValue = 10000000;
    constexpr int THREADS_COUNT = 10;
      
    atomic<int64_t> concurrentSum{0};
    
    void doSum(int64_t start, int64_t end) {
      int64_t sum = 0;
      for(auto i=start; i<=end; i++) {
        sum += i;
      }
    
      concurrentSum += sum;
    }
    
    
    int main(int argc, char **argv)
    {
      cout << "len, sum, time(milli seconds)\n";
      vector<future<void>> taskPool(THREADS_COUNT);
      auto begin_time = chrono::steady_clock::now();
      for(int i=0; i<THREADS_COUNT; i++) {
        taskPool[i] = async(&doSum, (i*maxValue/THREADS_COUNT)+1, ((i+1)*maxValue/THREADS_COUNT));
      }
    
      for(auto &th: taskPool) {
        th.get();
      }
    
      auto end_time =chrono::steady_clock::now();
      
      double elapsed_ms = 
      chrono::duration_cast<chrono::milliseconds>(end_time - begin_time).count();
    
      cout << maxValue << ", " << concurrentSum
           << ", " << elapsed_ms << endl;
    
      return 0;
    }

The median time of this code is also 5ms on my machine.

These are some useful concurrency patterns in C++ (introduced after C++11). The performance will vary depending on how many threads you spawn, and your processor, cores, etc. The harder part of concurrency is writing code that is correct in all conditions. `std::mutex` and `std::atomic` are useful facilities for locking.

# References

  1. [Concurrency in C++11](https://www.classes.cs.uchicago.edu/archive/2013/spring/12300-1/labs/lab6/)

  2. [C++ reference](https://en.cppreference.com/w/)
