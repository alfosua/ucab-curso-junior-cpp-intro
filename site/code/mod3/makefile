CXX      := g++
CXXFLAGS := -std=c++20 -Wall -Wextra -Iinclude
TARGET   := pipboy

SRCS     := src/main.cpp src/ui.cpp src/dweller.cpp src/cmd.cpp
OBJS     := $(SRCS:.cpp=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(OBJS) $(TARGET)
