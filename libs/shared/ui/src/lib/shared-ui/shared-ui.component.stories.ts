import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedUiComponent } from './shared-ui.component';

export default {
  title: 'SharedUiComponent',
  component: SharedUiComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: { testOutput: { action: 'testOutput' } },
} as Meta<SharedUiComponent>;

const Template: Story<SharedUiComponent> = (args: SharedUiComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  testInput: '123'
};
