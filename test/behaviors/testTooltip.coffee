describe '[behavior] Tooltip', ->

  describe '{unit} registerTooltip', ->

    track = null
    element = null

    beforeEach ->
      track =
        dispatch: d3.dispatch('mouseover', 'mouseout')
      element =
        call: -> return
      sinon.spy(element, 'call')

    it 'should call tooltip.show on mouseover', ->
      circosJS._registerTooltip(track, element, {})
      sinon.stub(track.tip, 'attr').returns(track.tip)
      sinon.stub(track.tip, 'show')
      track.dispatch.mouseover({}, 0, 0)
      expect(track.tip.show.calledWith({}, 0, 0)).to.be.true

    it 'should call tooltip.hide on mouseout', ->
      circosJS._registerTooltip(track, element, {})
      sinon.stub(track.tip, 'attr').returns(track.tip)
      sinon.stub(track.tip, 'show')
      sinon.stub(track.tip, 'hide')
      track.dispatch.mouseout({}, 0, 0)
      expect(track.tip.hide.calledOnce).to.be.true

    it 'should register the tooltip on element', ->
      circosJS._registerTooltip(track, element, {})
      expect(element.call.calledWith(track.tip)).to.be.true
