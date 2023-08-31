import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface IInstruction {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionsComponent implements OnInit {
  public instructions: IInstruction[] = [
    {
      title: 'Connect your wallet',
      description: 'Connect your wallet through Metamask or WalletConnect.',
      icon: 'fa-plug'
    },
    {
      title: 'Pick your favorite NFT(s)',
      description:
        'Once connected you will be able to see your NFTs in your gallery. Pick your favorite(s) and choose a canvas.',
      icon: 'fa-crosshairs'
    },
    {
      title: 'Ready to ship',
      description: 'Once your order is submitted, we can start printing.',
      icon: 'fa-check'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
