import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tag',
})
export class TagOptimizerPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return;
    }

    if (value === "Hack and slash/Beat 'em up") {
      return 'Hack and slash';
    }

    if (value === 'Real Time Strategy (RTS)') {
      return 'Real Time Strategy';
    }

    if (value === 'Role-playing (RPG)') {
      return 'RPG';
    }

    if (value === 'Turn-based strategy (TBS)') {
      return 'Turn-based strategy';
    }

    if (value === '4X (explore, expand, exploit, and exterminate)') {
      return 'Do anything';
    }

    return value;
  }
}
