import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

DIMENSION_RATIO = 2
SCREEN_HEIGHT = 700
SCREEN_WIDTH = SCREEN_HEIGHT * DIMENSION_RATIO

RESOLUTION = 150  # on height
CELL_WIDTH = int(SCREEN_WIDTH / RESOLUTION)

launched = True
board = [[0 for _ in range(RESOLUTION * DIMENSION_RATIO)] for _ in range(RESOLUTION)]

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Title")

while launched:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            launched = False
    screen.fill(WHITE)
    # code
    pygame.display.update()
  
