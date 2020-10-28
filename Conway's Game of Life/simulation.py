import pygame
import random


def number_of_neighbours(matrix, i, j):
    count = 0
    for x in range(-1, 2):
        for y in range(-1, 2):
            if 0 <= i + x < RESOLUTION and 0 <= j + y < RESOLUTION:
                if matrix[i + x][j + y] == 1:
                    count += 1
    return count - 1 if matrix[i][j] == 1 else count


def next_generation(previous_state):
    new_canvas = [[0 for _ in range(RESOLUTION)] for _ in range(RESOLUTION)]
    for i in range(RESOLUTION):
        for j in range(RESOLUTION):
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


WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

DIMENSION_RATIO = 2
SCREEN_HEIGHT = 700
SCREEN_WIDTH = SCREEN_HEIGHT * DIMENSION_RATIO

RESOLUTION = 150  # on height
CELL_WIDTH = int(SCREEN_WIDTH / RESOLUTION)

launched = True
board = [[0 for _ in range(RESOLUTION * DIMENSION_RATIO)] for _ in range(RESOLUTION)]

for i in range(2000):
    board[random.randint(0, RESOLUTION - 1)][random.randint(0, RESOLUTION - 1)] = 1

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Conway's Game of Life")

while launched:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            launched = False
    screen.fill(WHITE)
    new = next_generation(board)
    for i in range(len(new)):
        for j in range(len(new[i])):
            if new[i][j] == 1:
                pygame.draw.rect(screen, BLACK, [i * CELL_WIDTH, j * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH])
    board = new
    pygame.display.update()
