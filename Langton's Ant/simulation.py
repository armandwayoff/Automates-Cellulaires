import pygame


class Ant:
    def __init__(self, x, y, orientation):
        self.x = x
        self.y = y
        self.o = orientation

    def up(self):
        self.y -= 1
        self.o = "UP"

    def right(self):
        self.x += 1
        self.o = "RIGHT"

    def down(self):
        self.y += 1
        self.o = "DOWN"

    def left(self):
        self.x -= 1
        self.o = "LEFT"

    def new_step(self):
        if board[self.y][self.x] == 1:
            board[self.y][self.x] = 0
            if self.o == "UP":
                self.left()
            elif self.o == "RIGHT":
                self.up()
            elif self.o == "DOWN":
                self.right()
            elif self.o == "LEFT":
                self.down()
        else:
            board[self.y][self.x] = 1
            if self.o == "UP":
                self.right()
            elif self.o == "RIGHT":
                self.down()
            elif self.o == "DOWN":
                self.left()
            elif self.o == "LEFT":
                self.up()


WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

DIMENSION_RATIO = 1
SCREEN_HEIGHT = 700
SCREEN_WIDTH = SCREEN_HEIGHT * DIMENSION_RATIO

RESOLUTION = 201  # on height
CELL_WIDTH = int(SCREEN_WIDTH / RESOLUTION)

launched = True
board = [[0 for _ in range(RESOLUTION * DIMENSION_RATIO)] for _ in range(RESOLUTION)]
ant = Ant(125, 125, "UP")
iteration = 0

pygame.init()
pygame.font.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Langton's Ant")
my_font = pygame.font.SysFont('Arial', 30)

while launched:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            launched = False
    screen.fill(WHITE)
    ant.new_step()
    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] == 1:
                pygame.draw.rect(screen, BLACK, [i * CELL_WIDTH, j * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH])
    iteration += 1
    text_surface = my_font.render(str(iteration).encode("utf-8").decode("utf-8"), True, BLACK)
    screen.blit(text_surface, (20, 20))
    pygame.display.update()
