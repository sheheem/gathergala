import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
})
export class SplitPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const words = value.split(' ');
    const trimmedWords = words.slice(0, limit);
    const trimmedSentence = trimmedWords.join(' ');
    return trimmedSentence + (words.length > limit ? '...' : '');
  }
}
