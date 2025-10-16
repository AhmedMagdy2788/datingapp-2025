import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-flat-button',
  imports: [],
  templateUrl: './FlatButton.component.html',
  styleUrl: './FlatButton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlatButtonComponent{
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  isLoading = input(false);
  
  buttonClasses = computed(() => {
    const base = 'px-4 py-2 rounded-lg font-semibold transition-colors';
    
    const variantClasses = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white'
    };
    
    const loadingClasses = this.isLoading() 
      ? 'opacity-50 cursor-not-allowed' 
      : '';
    
    return `${base} ${variantClasses[this.variant()]} ${loadingClasses}`;
  });
}
