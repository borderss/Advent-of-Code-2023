#define  _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main (){
  char **array = NULL;
  char *ln = NULL;
  size_t buff = 0;
  size_t nchr = 0;
  size_t arridx = 0;
  size_t maxlen = 255;
  FILE *fileptr = NULL;

  if (!(fileptr = fopen("./input.txt", "r"))) {
    fprintf(stderr, "Failed to read file");
    return 1;
  }

  if (!(array = calloc(maxlen, sizeof *array))) {
    fprintf(stderr, "Failed to allocate memory 😂");
    return 1;
  }

  while ((nchr = getline(&ln, &buff, fileptr)) != -1) {
    while(nchr > 0 && (ln[nchr-1] == '\n' || ln[nchr-1] == '\r')) {
      ln[--nchr];
    }

    size_t i, j;
    for (i = 0, j = 0; ln[i] != '\0'; i++, j++) {
      ln[j] = ln[i];
      if (ln[i] == ' ' && ln[i + 1] == ' ') {
        while (ln[i + 1] == ' ') {
          i++;
        }
      }
    }
    ln[j] = '\0';


    array[arridx++] = strdup(ln);

    if (arridx == maxlen) {
      char **tmp = realloc(array, maxlen * 2 * sizeof *array);
      if (!tmp) {
        return -1;
      }
      array = tmp;
      maxlen *= 2;
    }
  }

  fclose(fileptr);
  free(ln);

  size_t iter = 0;
  for (iter = 0; iter < arridx; iter++){
    char *target1 = NULL;
    char *target2 = NULL;
    char *start1, *end1;
    char *start2, *end2;

    if (start1 = strstr(array[iter], ": ")) {
      start1 += strlen(": ");
      if (end1 = strstr(start1, " | ")) {
        target1 = (char *)malloc(end1 - start1 + 1);
        memcpy(target1, start1, end1 - start1);
        target1[end1 - start1] = '\0';
      }
    }

    if (start2 = strstr(array[iter], "| ")) {
      start2 += strlen("| ");
      if (end2 = strstr(start2, "\0")) {
        target2 = (char *)malloc(strlen(end2) + 1);
        memcpy(target2, start2, strlen(end2));
        int len = strlen(end2);
        if (target2[len-1] == '\n') {
          target2[len-1] = 0;
          target2[len-2] = 0;
        }
      }
    }

    printf("'%s' and '%s'\n", target1, target2);
    free(target1);
    free(target2);
  }

  printf("\n");

  for (iter = 0; iter < arridx; iter++){
    free(array[iter]);
  }
  free(array);

  return 0;
}