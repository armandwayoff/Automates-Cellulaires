"""
Conway's Game of Life
"""


def number_of_neighbours(matrix, i, j):
    count = 0
    for x in range(-1, 2):
        for y in range(-1, 2):
            if 0 <= i + x < SIZE_CANVAS and 0 <= j + y < SIZE_CANVAS:
                if matrix[i + x][j + y] == 1:
                    count += 1
    return count - 1 if matrix[i][j] == 1 else count


def next_generation(previous_state):
    new_canvas = [[0 for _ in range(SIZE_CANVAS)] for _ in range(SIZE_CANVAS)]
    for i in range(SIZE_CANVAS):
        for j in range(SIZE_CANVAS):
            num_neigh = number_of_neighbours(previous_state, i, j)
            if previous_state[i][j] == 1 and num_neigh < 2:
                new_canvas[i][j] = 0
            elif previous_state[i][j] == 1 and 2 <= num_neigh <= 3:
                new_canvas[i][j] = 1
            elif previous_state[i][j] == 1 and num_neigh > 3:
                new_canvas[i][j] = 0
            elif previous_state[i][j] == 0 and num_neigh == 3:
                new_canvas[i][j] = 1
    return new_canvas


SIZE_CANVAS = 10
ITERATION = 16

canvas = [[0 for _ in range(SIZE_CANVAS)] for _ in range(SIZE_CANVAS)]

# First shape
canvas[0][1] = 1
canvas[2][0] = 1
canvas[2][1] = 1
canvas[2][2] = 1
canvas[1][2] = 1

print("FIRST STATE")
for row in canvas:
    print(row)
print()

for _ in range(ITERATION):
    new = next_generation(canvas)
    canvas = new

print("FINAL STATE")
for row in canvas:
    print(row)
