            <ButtonGroup>
              <Button bsSize="large" className="padded" active={ this.state.area === 'overview' } onClick={ this.setArea.bind(this, 'overview') }>Photowall</Button>  
              <Button bsSize="large" className="padded" active={ this.state.area === 'byactivity' } onClick={ this.setArea.bind(this, 'byactivity') }>By activity</Button>
              <Button bsSize="large" className="padded" active={ this.state.area === 'bytype' } onClick={ this.setArea.bind(this, 'bytype') }>By type</Button>  
            </ButtonGroup>