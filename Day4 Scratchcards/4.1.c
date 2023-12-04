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

  int sum = 0;
  
  while ((len = getline(&ln, &buff, fileptr)) != -1) {
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

    while (token != NULL) {
      if (token != "") {
        char a[8] = " ";
        strcat(a, token);
        strcat(a, " ");

        if (strstr(answers, a) != NULL){
          if (cardSum == 0) cardSum++;
          else if (cardSum >= 1) cardSum = cardSum * 2;
        }
      }
      token = strtok(NULL, " ");
    }
    sum += cardSum;
  }

  fclose(fileptr);
  free(ln);

  printf("%d\n", sum);

  clock_t end = clock();

  printf("%f\n", (double)(end - begin));
  return 0;
}