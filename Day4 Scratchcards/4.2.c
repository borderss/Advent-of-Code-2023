#define  _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int main (){
  clock_t begin = clock();

  char *ln = NULL;
  size_t len = 0;
  size_t buff = 0;
  FILE *fileptr = fopen("./input.txt", "r");

  int cardCounts[215] = {0};
  int lineIndex = 0;
  
  while ((len = getline(&ln, &buff, fileptr)) != -1) {
    lineIndex++;
    cardCounts[lineIndex] += 1;

    int cardSum = 0;
    if (ln[len - 1] == '\n') {
      ln[len - 1] = '\0';
      --len;
    }

    char *nums = strtok(ln, ":");
    nums = strtok(NULL, ":");

    char *answers = strtok(nums, "|");
    char *data = strtok(NULL, "|");
    char *token = strtok(data, " ");

    int matchCount = 0;

    while (token != NULL) {
      if (token != "") {
        char a[8] = " ";
        strcat(a, token);
        strcat(a, " ");

        if (strstr(answers, a) != NULL) matchCount++;
      }
      token = strtok(NULL, " ");
    }

    if (matchCount > 0) {
      while (matchCount != 0) {
        cardCounts[lineIndex + matchCount] += cardCounts[lineIndex];
        --matchCount;
      }
    }
  }

  fclose(fileptr);
  free(ln);

  int totalsum = 0;
  for (int i = 1; i < sizeof(cardCounts) / sizeof(int); i++) {
    totalsum += cardCounts[i];
  }

  printf("%d\n", totalsum);

  clock_t end = clock();

  printf("%f\n", (double)(end - begin));
  return 0;
}